using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Utilities
{
    public interface IHttp
    {
        HttpResponse DoRequest(string url, string requestBody, string contentType, string method, IList<KeyValuePair<string, string>> headers = null);
        Task<HttpResponse> DoRequestAsync(string url, string requestBody, string contentType, string method, IList<KeyValuePair<string, string>> headers = null);
    }
}
