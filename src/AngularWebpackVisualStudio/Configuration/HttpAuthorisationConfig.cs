using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Configuration
{
    public class HttpAuthorisationConfig
    {
        public string ApiUrl { get; set; }
        public string LoginUrl { get; set; }
        public string LoginResource { get; set; }
        public string ClientId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string AuthenticationToken { get; set; }
        public AuthenticationType AuthenticationType { get; set; }
    }

    public enum AuthenticationType
    {
        None = 0,
        Login,
        AuthorisationToken
    }
}