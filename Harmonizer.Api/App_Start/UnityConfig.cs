using Harmonizer.Api.Services;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DataAccess;
using Harmonizer.Infrastructure.DataAccess.Repositories;
using Harmonizer.Services.Interfaces;
using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

namespace Harmonizer.Api
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
			container.RegisterType<ISequenceRepository, SequenceRepository>();
			container.RegisterType<IStaticDataRepository, StaticDataRepository>();
			container.RegisterType<ISequenceService, SequenceService>();
			container.RegisterType<IStaticDataService, StaticDataService>();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}