using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pet.Prototype.Models
{
    public class AnnouncementViewModel
    {
        public Guid Id { get; set; }
        public Guid SellerId { get; set; }
        public string DateBidding { get; set; }
        public decimal StartPrice { get; set; }
        public Nullable<decimal> Margin { get; set; }
        public string DeadlineDate { get; set; }
        public string GoodsName { get; set; }
        public string Composition { get; set; }
        public string LotSize { get; set; }
        public Nullable<int> LotCount { get; set; }
        public Nullable<int> TypeDelivery { get; set; }
        public string DateDelivery { get; set; }
        public string PaymentType { get; set; }
        public Nullable<int> Status { get; set; }
        public int No { get; set; }

        public string StatusName { get; set; }
    }
}