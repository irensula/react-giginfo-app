Cypress.Commands.add('loginKeikkainfo', (username, password) => {
    cy.visit('http://localhost:5173/');
    cy.contains('a', 'Kirjaudu').click();
    cy.get('input[id=username]').type(username)
    cy.get('input[id=password]').type(`${password}{enter}`, { log: false })
    cy.contains('h1', 'KEIKKAINFO').should('be.visible')
  })
  
  Cypress.Commands.add("addNewGig", (
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
    newGigRate) => {
      cy.get('input[id=newGigName]').type(newGigName)
      cy.get('input[id=newGigArtist]').type(newGigArtist)
      cy.get('input[id=newGigImage]').type(newGigImage)
      cy.get('input[id=newGigDesc]').type(newGigDesc)
      cy.get('input[id=newGigDate]').type(newGigDate)
      cy.get('input[id=newGigTime]').type(newGigTime)
      cy.get('input[id=newGigAddress]').type(newGigAddress)
      cy.get('input[id=newGigCity]').type(newGigCity)
      cy.get('input[id=newGigTicketSaleLink]').type(newGigTicketSaleLink)
      cy.get('input[id=newGigGenre]').type(newGigGenre)
      cy.get('input[id=newGigArtistLink]').type(newGigArtistLink)
      cy.get('input[id=newGigRate]').type(newGigRate)
      cy.get('input[id=submit]').click();
      cy.contains("Keikka on lisätty onnistuneesti").should('exist');
  })