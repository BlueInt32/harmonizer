using System.Web.Mvc;
using Harmonizer.Api.App_Start;
using Harmonizer.Api.Services;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DataAccess;
using Harmonizer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace Harmonizer.Api
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
		{

	        SimpleInjectorWebApiInitializer.Initialize();

			GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
