using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ViewProjectModuleCount
{
    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public int? NumberOfModule { get; set; }
}
