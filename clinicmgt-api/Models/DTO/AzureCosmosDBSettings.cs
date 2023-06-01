namespace clinicmgt_api.Models.DTO
{
    public class AzureCosmosDBSettings
    {
        public string Account { get; set; }
        public string Key { get; set; }
        public string DatabaseName { get; set; }
        public string ContainerName { get; set; }
    }
}
