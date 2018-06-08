using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype.Models
{
    public class ItemResponse
    {
        public bool IsError { get; set; }
        public string ErrorMessage { get; set; }
        public string Id { get; set; }
    }
}