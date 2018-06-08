using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype.Models
{
    public class BankViewModel
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public string BIK { get; set; }
        public string IIK { get; set; }
        public int? Kbe { get; set; }
        public string AccountType { get; set; }
        public string OpenDate { get; set; }
        public DateTime? CloseDate { get; set; }
        public string AccountCurrency { get; set; }
        public string Address { get; set; }
    }
}