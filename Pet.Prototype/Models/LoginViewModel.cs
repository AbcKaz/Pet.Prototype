using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype.Models
{
    public class LoginViewModel
    {
        public string UserName { get; set; }
        
        public string Password { get; set; }
        
        public bool RememberMe { get; set; }
        
        public string Certificate { get; set; }

        public string ContentMenu { get; set; }
    }
}