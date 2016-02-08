using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Owin;
using System.Diagnostics;
using Microsoft.Owin.StaticFiles;
using Microsoft.Owin.FileSystems;
using System.Configuration;

namespace Harmonizer.Owin.Server
{
	class Program
	{
		static void Main(string[] args)
		{
			var url = "http://localhost:8000";
			var root = ConfigurationManager.AppSettings["frontPath"];
			var fileSystem = new PhysicalFileSystem(root);

			var options = new FileServerOptions
			{
				EnableDirectoryBrowsing = true,
				FileSystem = fileSystem
			};
			WebApp.Start(url, builder => builder.UseFileServer(options));

			ProcessStartInfo start = new ProcessStartInfo(@"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe");

			start.Arguments = "http://localhost:8000 -incognito";

			// Run the external process & wait for it to finish
			Process proc = Process.Start(start);

			Console.WriteLine("Listening at " + url);
			Console.ReadLine();
		}
	}
}
