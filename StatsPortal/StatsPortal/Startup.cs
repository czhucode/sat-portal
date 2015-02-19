using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(StatsPortal.Startup))]
namespace StatsPortal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
