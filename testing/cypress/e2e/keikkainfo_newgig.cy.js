const username="marydoe";
const password="12345678";

const newGigName="LOFI";
const newGigArtist="Pip-Blom";
const newGigImage = "pip-blom.jpg";
const newGigDesc = "Tämä on mahtava keikkä";
const newGigDate = "2025-08-22";
const newGigTime = "20:00";
const newGigAddress = "Hämeenkatu 20";
const newGigCity = "Tampere";
const newGigTicketSaleLink = "ticketsale.com";
const newGigGenre = "lofi";
const newGigArtistLink = "artistlink.com";
const newGigRate = 5;
// http://localhost:5173/#gigs
describe("Keikkainfo_mongo adding new gig test", () => {
    beforeEach(() => {
      cy.loginKeikkainfo(username, password);
      cy.visit('http://localhost:5173/uusi-keikka');
    })
    it('adds new gig and checks success message and redirection', () => {
        cy.addNewGig(
            newGigName, 
            newGigArtist, 
            newGigImage, 
            newGigDesc, 
            newGigDate, 
            newGigTime,
            newGigAddress, 
            newGigCity, 
            newGigTicketSaleLink, 
            newGigGenre, 
            newGigArtistLink, 
            newGigRate
        );
        cy.url().should('include', '#gigs');
        cy.contains("Keikka on lisätty onnistuneesti").should('exist')
    })
    afterEach(()=> {
      cy.get('button[id=logout]').click()
    })
  })

//   it('change importance', () => {
//     cy.get("p").contains("Cypress testing important").click()
//     cy.get("p").contains("Cypress testing important").should('exist').and('have.class', 'basic')
//   })
//   it('delete important', () => {
//     cy.get("p").contains("Cypress testing important").and('have.class', 'basic').find('button').click()
//     cy.get("p").contains("Cypress testing important").should('not.exist')
//   })