using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;

namespace Harmonizer.Front
{
	public class BundleConfig
	{
			public const string LessBundle = "~/less";
		public const string LibsJsBundle = "~/bundles/libs";
		public const string AppJsBundle = "~/bundles/app";

		public static void RegisterBundles(BundleCollection bundles)
		{
			var lessBundle = new Bundle(LessBundle);
			lessBundle.Transforms.Add(new StyleTransformer());
			lessBundle.Transforms.Add(new CssMinify());
			lessBundle.Orderer = new NullOrderer();
			lessBundle.Include("~/css/_utils.less");
			lessBundle.Include("~/css/atomics.less");
			lessBundle.Include("~/css/chord.less");
			lessBundle.Include("~/css/commands.less");
			lessBundle.Include("~/css/home.less");

			bundles.Add(lessBundle);

			bundles.Add(new ScriptBundle(LibsJsBundle).Include("~/js/vendor/angular.js", "~/js/vendor/howler.js"));
			bundles.Add(new ScriptBundle(AppJsBundle).Include(
				"~/js/app.js",
				"~/js/config.js",
				"~/js/controllers/mainController.js",
				"~/js/directives/chordBlockDirective.js",
				"~/js/directives/wheelSelect.js",
				"~/js/factories/chordFactory.js",
				"~/js/factories/soundFactory.js",
				"~/js/factories/configFactory.js"
				));

			//BundleTable.EnableOptimizations = true;
		}
	}
}
