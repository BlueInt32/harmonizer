using System.Web.Mvc;
using Harmonizer.Api.Services;
using Harmonizer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using Microsoft.Practices.Unity.WebApi;
using Microsoft.Practices.Unity;

namespace Harmonizer.Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
