using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
