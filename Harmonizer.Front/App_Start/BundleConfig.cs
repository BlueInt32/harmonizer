using System.Web;
using System.Web.Optimization;

namespace Harmonizer.Front
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{

			bundles.Add(new LessBundle("~/less").Include(
				"~/css/_utils.less", 
				"~/css/atomics.less",
				"~/css/chord.less", 
				"~/css/commands.less", 
				"~/css/home.less"
				));


			bundles.Add(new ScriptBundle("~/bundles/libs").Include("~/js/vendor/angular.js", "~/js/vendor/howler.js"));
			bundles.Add(new ScriptBundle("~/bundles/app").Include(
				"~/js/app.js",
				"~/js/config.js",
				"~/js/controllers/mainController.js",
				"~/js/directives/chordBlockDirective.js",
				"~/js/directives/wheelSelect.js",
				"~/js/factories/chordFactory.js",
				"~/js/factories/soundFactory.js"
				));

			// Set EnableOptimizations to false for debugging. For more information,
			// visit http://go.microsoft.com/fwlink/?LinkId=301862
			BundleTable.EnableOptimizations = true;
		}
	}
}
