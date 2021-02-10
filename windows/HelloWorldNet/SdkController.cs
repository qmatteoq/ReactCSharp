using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace HelloWorldNet
{
    public class SdkController: ApiController
    {
        public string Get(string name, string surname)
        {
            return $"Hello {name} {surname}";
        }
    }
}
