using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype.Models
{
    public class CompanyViewModel
    {
        public System.Guid Id { get; set; }     
        public string JuridicalName { get; set; }
        public string BIN { get; set; }
        public string CompanyHeadName { get; set; }
        public Nullable<int> Oblast { get; set; }
        public Nullable<int> Region { get; set; }
        public string JuridicalAddress { get; set; }
        public string FactAddress { get; set; }
        public int RoleCode { get; set; }
        public bool IsExist { get; set; }
    }
}