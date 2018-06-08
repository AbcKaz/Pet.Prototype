using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype.Models
{
    public class OrderViewModel
    {
        public Guid Id { get; set; }
        public string CreateDate { get; set; }
        public Guid AnnouncementId { get; set; }
        public Guid BuyerId { get; set; }
        public string StatusName { get; set; }
        public Guid BankAccountId { get; set; }
        public int Status { get; set; }
        public string BankWarranty { get; set; }
        public string BuyerName { get; set; }
        public string BuyerBIN { get; set; }

        public string No { get; set; }
        public int SellerNo { get; set; }
        public int TypeDelivery { get; set; }
        public decimal SellerStartPrice { get; set; }
        public string SellerDeliveryType { get; set; }
    }
}