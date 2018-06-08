using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Web;
using System.Xml;

namespace Pet.Prototype.Utilis
{
    public class SerializeHelper
    {
        public static string SerializeDataContract<T>(T value)
        {
            if (value == null)
            {
                return null;
            }

            DataContractSerializer serializer = new DataContractSerializer(typeof(T));
            //            XmlDictionaryWriter xdw = XmlDictionaryWriter.CreateTextWriter(someStream, Encoding.UTF8);
            //            dcs.WriteObject(xdw, p);
            
            XmlWriterSettings settings = new XmlWriterSettings();
            settings.Encoding = Encoding.UTF8; //new UTF8Encoding(false, false); // no BOM in a .NET string
            settings.Indent = false;
            settings.OmitXmlDeclaration = false;

            using (StringWriter textWriter = new StringWriter())
            {
                using (XmlWriter xmlWriter = XmlDictionaryWriter.Create(textWriter, settings))
                {
                    serializer.WriteObject(xmlWriter, value);
                }
                return textWriter.ToString();
            }
        }
    }
}