using System.Web;
using System.Web.Optimization;

namespace StatsPortal
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/site").Include(
                        "~/Scripts/site.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add((new ScriptBundle("~/bundles/matching").Include(
                        "~/Scripts/matching.js")));

            bundles.Add((new ScriptBundle("~/bundles/snippets").Include(
                        "~/Scripts/snippets.js")));

            bundles.Add((new ScriptBundle("~/bundles/cookies").Include(
                        "~/Scripts/cookies.js")));

            bundles.Add((new ScriptBundle("~/bundles/sk").Include(
                        "~/Scripts/sk.js")));

            bundles.Add((new ScriptBundle("~/bundles/ridetector").Include(
                       "~/Scripts/ridetector.js")));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            // Adding the Kendo UI javascript bundle.
            bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
                        "~/Scripts/kendo/kendo.all.min.js",
                            // "~/Scripts/kendo/kendo.timezones.min.js", // uncomment if using the Scheduler
                        "~/Scripts/kendo/kendo.aspnetmvc.min.js"));

            // Adding the Kenndo UI style bundle
            bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
                        "~/Content/kendo/kendo.common-bootstrap.min.css",
                        "~/Content/kendo/kendo.bootstrap.min.css"));

            // Tell ASP.NET bundles to allow minified files in debug mode.
            bundles.IgnoreList.Clear();
        }
    }
}
