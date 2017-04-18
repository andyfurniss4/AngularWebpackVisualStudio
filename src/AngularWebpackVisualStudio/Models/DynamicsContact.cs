using Newtonsoft.Json;
using System;

namespace AngularWebpackVisualStudio.Models
{
    public class DynamicsContact
    {
        [JsonProperty(PropertyName = "contactid")]
        public Guid Id;
        [JsonProperty(PropertyName = "fullname")]
        public string FullName;
        [JsonProperty(PropertyName = "gbp_legacycontactid")]
        public string LegacyContactId;
    }
}
