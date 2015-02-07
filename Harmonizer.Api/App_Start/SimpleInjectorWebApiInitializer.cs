using Harmonizer.Api.Services;
using Harmonizer.Domain.Interfaces;
using Harmonizer.Infrastructure.DataAccess;
using Harmonizer.Infrastructure.DataAccess.Repositories;
using Harmonizer.Services.Interfaces;

[assembly: WebActivator.PostApplicationStartMethod(typeof(Harmonizer.Api.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace Harmonizer.Api.App_Start
{
    using System.Web.Http;
    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;
    
    public static class SimpleInjectorWebApiInitializer
    {
        /// <summary>Initialize the container and register it as MVC3 Dependency Resolver.</summary>
        public static void Initialize()
        {
            // Did you know the container can diagnose your configuration? Go to: https://bit.ly/YE8OJj.
            var container = new Container();
            
            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
       
            container.Verify();
            
            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }
     
        private static void InitializeContainer(Container container)
        {
			//#error Register your services here (remove this line).

            // For instance:
            // container.RegisterWebApiRequest<IUserRepository, SqlUserRepository>();

			container.RegisterWebApiRequest<ISequenceRepository, SequenceRepository>();
			container.RegisterWebApiRequest<IStaticDataRepository, StaticDataRepository>();
			container.RegisterWebApiRequest<ISequenceService, SequenceService>();
			container.RegisterSingle<IStaticDataService, StaticDataService>();
        }
    }
}