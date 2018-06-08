using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype.Models
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SecondName { get; set; }
        public string IIN { get; set; }
        public string MobilePhone { get; set; }
        public string ExtraPhone { get; set; }
        public string WorkPhone { get; set; }
        public string UserPosition { get; set; }
        public Guid? CompanyId { get; set; }       
        public string StatusName { get; set; }
        public bool? IsActive { get; set; }
    }
}