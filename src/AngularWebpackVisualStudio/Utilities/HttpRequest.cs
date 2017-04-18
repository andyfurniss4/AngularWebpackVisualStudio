using AngularWebpackVisualStudio.Configuration;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Utilities
{
    public class HttpRequest : IHttp
    {
        private readonly HttpAuthorisationConfig authConfig;
        private readonly bool debug;
        private static readonly HttpAuthorisationConfig defaultAuthConfig = new HttpAuthorisationConfig();
        private static readonly ConcurrentDictionary<HttpAuthorisationConfig, HttpClient> clients =
            new ConcurrentDictionary<HttpAuthorisationConfig, HttpClient>();

        /// <summary>
        /// Initialise an HttpRequest object
        /// </summary>
        /// <param name="debug">Run in debug mode</param>
        public HttpRequest(HttpAuthorisationConfig authConfig = null)
        {
            this.authConfig = authConfig ?? defaultAuthConfig;

            clients.GetOrAdd(
                this.authConfig,
                (x) =>
                {
                    var handler = new HttpClientHandler();
                    if (handler.SupportsAutomaticDecompression)
                    {
                        handler.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
                    }

                    var newClient = new HttpClient(handler, false);
                    authenticateClient(newClient);
                    return newClient;
                }
            );
        }

        private static readonly object authenticateLock = new object();
        private void authenticateClient(HttpClient client)
        {

            switch (authConfig.AuthenticationType)
            {
                case AuthenticationType.Login:
                    authenticateLoginClient(client);
                    break;
                case AuthenticationType.AuthorisationToken:
                    client.DefaultRequestHeaders.Add("Authentication-Token", authConfig.AuthenticationToken);
                    break;
            }
        }

        private void authenticateLoginClient(HttpClient client)
        {
            string tokenEndpoint = $"{authConfig.LoginUrl}/oauth2/token";
            var body = $"resource={authConfig.LoginResource}&client_id={authConfig.ClientId}&grant_type=password&username={authConfig.Username}&password={authConfig.Password}";
            var stringContent = new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded");

            var result = AsyncHelpers.RunSync(() =>
                client.PostAsync(tokenEndpoint, stringContent).ContinueWith<string>((response) =>
                {
                    return response.Result.Content.ReadAsStringAsync().Result;
                })
            );

            JObject jobject = JObject.Parse(result);
            var token = jobject["access_token"].Value<string>();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }

        public async Task<HttpResponse> DoRequestAsync(string url, string requestBody, string contentType, string method, IList<KeyValuePair<string, string>> headers = null)
        {
            if (string.IsNullOrEmpty(method))
                throw new ArgumentException("Method is required");

            return await AttemptRequest(url, requestBody, contentType, method, headers);
        }

        private async Task<HttpResponse> AttemptRequest(string url, string requestBody, string contentType, string method, IList<KeyValuePair<string, string>> headers = null)
        {
            var retries = 0;
            HttpResponseMessage response = null;
            while (retries < 3)
            {

                var client = clients[authConfig];
                switch (method)
                {
                    case "POST":
                        response = await client.PostAsync(url, CreateHttpContent(requestBody, contentType, headers));
                        break;
                    case "PUT":
                        response = await client.PutAsync(url, CreateHttpContent(requestBody, contentType, headers));
                        break;
                    case "GET":
                        response = await client.GetAsync(url);
                        break;
                    case "DELETE":
                        response = await client.DeleteAsync(url);
                        break;
                    case "PATCH":
                        response = await client.PatchAsync(url, CreateHttpContent(requestBody, contentType, headers));
                        break;
                    default:
                        throw new ArgumentException("Unknown method " + method);
                }

                // Authenticate and retry if unauthorized
                if (response.StatusCode == HttpStatusCode.Unauthorized && authConfig.AuthenticationType == AuthenticationType.Login)
                {
                    authenticateClient(client);
                    retries++;
                    continue;
                }

                break;
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            return new HttpResponse()
            {
                Successful = response.IsSuccessStatusCode,
                StatusCode = (int)response.StatusCode,
                Content = responseContent
            };
        }

        private StringContent CreateHttpContent(string requestBody, string contentType, IList<KeyValuePair<string, string>> headers = null)
        {
            if (string.IsNullOrEmpty(requestBody))
                throw new ArgumentException("Request body is required when the HTTP request is POST, PUT or PATCH");

            var content = new StringContent(requestBody);
            content.Headers.Remove("Content-Type");
            content.Headers.Add("Content-Type", contentType);

            if (headers != null)
            {
                foreach (var header in headers)
                {
                    content.Headers.Remove(header.Key);
                    content.Headers.Add(header.Key, header.Value);
                }
            }

            return content;
        }

        public HttpResponse DoRequest(string url, string requestBody, string contentType, string method, IList<KeyValuePair<string, string>> headers = null)
        {
            return AsyncHelpers.RunSync(() => DoRequestAsync(url, requestBody, contentType, method, headers));
        }
    }

    public class HttpResponse
    {
        public bool Successful { get; set; }
        public int StatusCode { get; set; }
        public string Content { get; set; }
    }
}
