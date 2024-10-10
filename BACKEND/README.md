#### Update Entity from Database

1. Open Package Manager Console in Tools -> NuGet Package Manager -> Package Manager Console

2. At Package Manager Console, choose hair_hamony.Data in 'Default project'

3. Running the following command
```
Scaffold-DbContext "Data Source=hairhamony.database.windows.net;Initial Catalog=HairHamony;Persist Security Info=True;User ID=hairhamony;Password=abcd@1234;Encrypt=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Entities -f
```