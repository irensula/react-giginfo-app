const validateGig = (gigData) => {
    const { name, artist, add_image, description, gig_date, time,  address, city, ticket_sale_link, genre, artist_link } = gigData;
  
    if (!name || name.length < 2) return "Keikan nimi puuttuu tai on liian lyhyt.";
    if (!artist || artist.length < 2) return "Keikan artisti puuttuu tai on liian lyhyt.";
    if (!add_image || add_image.length < 6) return "Keikan kuva puuttuu tai on liian lyhyt.";
    if (!description || description.length < 5) return "Keikkakuvaus puuttuu tai on liian lyhyt.";
    if (!gig_date || /^([0-2][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(gig_date)) return "Keikkapäivän täytyy olla muodossa PP-KK-VVVV";
    if (!time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return "Ajan täytyy olla muodossa HH:MM";
    if (!address || address.length < 5) return "Katuosoite puuttuu tai on liian lyhyt.";
    if (!city || city.length < 2) return "Paikkakunta puuttuu tai on liian lyhyt.";
    if (!ticket_sale_link || ticket_sale_link.length < 5 || !ticket_sale_link.includes('.')) return "Ole hyvä ja kirjoita kelvollinen linkki.";    
    if (!genre || genre.length < 2) return "Musiikkityylilaji on puuttuu tai on liian lyhyt.";
    if (!artist_link || artist_link.length < 5 || !artist_link.includes('.')) return "Ole hyvä ja kirjoita kelvollinen linkki.";
    
    return null;
  };
  
  export default validateGig;