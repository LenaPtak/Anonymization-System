describe("Anonymization System", () => {
    
  
  beforeEach(() => {
    
    cy.visit("http://localhost:3000/");
   
  })

  it("Czy przyciski są aktywne", () => {
    cy.contains("about us").should("not.be.disabled");
    cy.contains("contact").should("not.be.disabled");
    cy.contains("other tools").should("not.be.disabled");
   
  });

  it("Logo", () => {
    cy.contains("Let's anonymize some documents").click();
    cy.get('img[class="header__logo"]').click();
   
    cy.contains('WE MAKE ANONYMIZATION SIMPLE.').should('be.visible')
   
  });

  it("przyciski do algorytmu anonimizacji", () => {
    
    cy.contains("Let's anonymize some documents").click();
    cy.get('input[type="file"]').selectFile('Wz2', { action: 'drag-drop' })
    cy.contains("Next step").click()
    cy.contains("Next step").click()
    cy.contains("Previous step").click()
    cy.contains("Next step").click()
    cy.contains("Next step").click()
    cy.contains("Next step").click()
    cy.contains("Finish!").click()
    cy.contains("Please wait..").should("be.visible")


    
  });
})