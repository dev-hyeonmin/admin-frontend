interface GoogleMapProps {
  className?: string;
}

const GoogleMap = ({className}: GoogleMapProps) => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.577271281171!2d129.12993351554118!3d35.16716201559951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356892c742de5047%3A0xffde3e84dcb16dcb!2z666k7KaI7YG066as64uJIOu2gOyCsCDshLzthYDsoJA!5e0!3m2!1sko!2skr!4v1570410955985!5m2!1sko!2skr"
      height="450"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map Embed"
      className={className}
    ></iframe>
  );
};

export default GoogleMap;