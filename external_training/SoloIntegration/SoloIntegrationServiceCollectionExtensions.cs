using Demands;
using Demands.Contracts;
using external_training.Repositories;
using Microsoft.Extensions.Options;
using OrgStructure;

namespace external_training.SoloIntegration
{
    public static class SoloIntegrationServiceCollectionExtensions
    {
        public static IServiceCollection AddSoloIntegration(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<SoloIntegrationOptions>(configuration.GetSection("SoloIntegration"));

            services.AddUsscDemandsApi(x => x.ConnectToHost("https://solo-demo.ft-soft.ru/")
                .SetApplicationToken("EducationPortal")
                .UseHttpClient());

            //services.AddSingleton(provider => 
            //{
                //var options = provider.GetRequiredService<IOptions<SoloIntegrationOptions>>().Value;
                //return UsscDemandsApi.Build(x =>
                    //x.ConnectToHost(options.Host)
                        //.SetApplicationToken(options.ApplicationToken)
                        //.UseHttpClient());
            //});

            services.AddHttpClient(nameof(DemandsApi))
                .ConfigurePrimaryHttpMessageHandler(() =>
                    new HttpClientHandler
                    {
                        UseDefaultCredentials = true,
                        ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                    });

            services.AddSingleton(provider =>
            {
                var options = provider.GetRequiredService<IOptions<SoloIntegrationOptions>>().Value;
                OrgStructureApi.Start(x => x.LoadFromFile(options.OrganizationFilePath)).Wait();
                return OrgStructureApi.GetOrganization();
            });

            var provider = services.BuildServiceProvider();
            var client = provider.GetRequiredService<IDemandsApiClient>();
            services.AddScoped(provider => client.GetContext());

            services.AddScoped<OrgStructureRepository>();
            services.AddScoped<SoloApplicationRepository>();

            return services;
        }
    }
}
