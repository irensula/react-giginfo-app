const validateUser = (userData) => {
    const { username, email, phone, password } = userData;

    if (!username) return "Käyttäjätunnus vaaditaan.";
    if (username.length < 6) return "Käyttäjätunnuksessa on oltava vähintään 6 merkkiä.";
    if (!email) return "Sähköposti vaaditaan.";
    if (email.length < 5 || !email.includes('.')) return "Ole hyvä ja kirjoita kelvollinen sähköpostiosoite.";
    if (!phone) return "Puhelimen vaaditaan.";
    if (phone.length < 8) return "Puhelimessa on oltava vähintään 8 merkkiä.";
    if (!password) return "Salasana vaaditaan.";
    if (password.length < 8) return "Salasanassa on oltava vähintään 8 merkkiä.";
    
    return null;
  };
  
  export default validateUser;