using System.Web.Mvc;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DataAccess;
using Harmonizer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace Harmonizer.Api
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
		{
			UnityConfig.RegisterComponents(); 
			GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
