describe('Test Suite - Employees test', () => {
  const webPage = '../html_prueba/ui-test-assessment-master/ui-test-assessment-master/employees.html'

    before(() => {
      cy.viewport(1280, 720)

    })
    it('Check we can see the titles of the web page', () => {
      cy.visit(webPage)
      // titles of the columns
      cy.get('#columntabletreeGrid > [role="columnheader"]').eq(0)
      .contains('span', 'FirstName')
      cy.get('#columntabletreeGrid > [role="columnheader"]').eq(1)
      .contains('span', 'LastName')
      cy.get('#columntabletreeGrid > [role="columnheader"]').eq(2)
      .contains('span', 'Title')
    })

    it('Check The first person is Andrew Fuller and Sales Vice President', () => {
      cy.visit(webPage)
      // Verify the first person in the list is the Sales Vice President Andrew Fuller
      cy.get('[data-key="2"]').contains('td', 'Andrew').should('be.visible');
      cy.get('[data-key="2"]').contains('td', 'Fuller').should('be.visible');
      cy.get('[data-key="2"]').contains('td', 'Vice President').should('be.visible');
    })

    it('Check The Sales Vice President Andrew is from Tacoma ', () => {
      cy.visit(webPage)
      // Verify the first person in the list is the Sales Vice President Andrew Fuller
      cy.get('[data-key="2"]').contains('td', 'Andrew').should('be.visible');
      // Check to see the details
      cy.get('[data-key="2"]').find(".jqx-tree-grid-checkbox").click()
      // press "View selected data" to see the city
      cy.get('button[id="btn"]').click()
      // check Andrew is from Tacoma
      cy.get('#listBoxSelected').should('be.visible');
      cy.get('#listitem0listBoxSelected').should('be.visible').contains('Tacoma');
    })

    it('Check The person Anne Dodsworth is not shown while Steven Buchanan is not selected ', () => {
      cy.visit(webPage)
      cy.get('[data-key="9"]').should('not.exist');
    })

    it('Check Steven is Sales Manager and is from London', () => {
      cy.visit(webPage)
      // Verify Steven Buchanan is Sales Manager
      cy.get('[data-key="5"]').contains('td', 'Steven').should('be.visible');
      cy.get('[data-key="5"]').contains('td', 'Buchanan').should('be.visible');
      cy.get('[data-key="5"]').contains('td', 'Sales Manager').should('be.visible');
      // Check to see the details
      cy.get('[data-key="5"]').find(".jqx-tree-grid-checkbox").click()
      // press "View selected data" to see the city
      cy.get('button[id="btn"]').click()
      // check Andrew is from Tacoma
      cy.get('#listBoxSelected').should('be.visible');
      cy.get('#listitem0listBoxSelected').should('be.visible').contains('London');
    })


    //Check “Steven” works with 3 persons from same department, and all 4 are from “London”
    it('Check Steven works with 3 persons from same department, and all 4 are from London', () => {
      cy.visit(webPage)
      // first we check the other person from that department is not shown
      cy.get('[data-key="9"]').should('not.exist');
      // check the option from Steven to show the other persons from that department
      cy.get('.jqx-tree-grid-collapse-button').click()
      // let's check the names from 3 persons are shown and are from same department
      cy.get('[data-key="6"]').contains('td', 'Michael').should('be.visible');
      cy.get('[data-key="6"]').contains('td', 'Suyama').should('be.visible');
      cy.get('[data-key="6"]').contains('td', 'Sales Representative').should('be.visible');
      cy.get('[data-key="6"]').find(".jqx-tree-grid-checkbox").click()

      cy.get('[data-key="7"]').contains('td', 'Robert').should('be.visible');
      cy.get('[data-key="7"]').contains('td', 'King').should('be.visible');
      cy.get('[data-key="7"]').contains('td', 'Sales Representative').should('be.visible');
      cy.get('[data-key="7"]').find(".jqx-tree-grid-checkbox").click()

      cy.get('[data-key="9"]').contains('td', 'Anne').should('be.visible');
      cy.get('[data-key="9"]').contains('td', 'Dodsworth').should('be.visible');
      cy.get('[data-key="9"]').contains('td', 'Sales Representative').should('be.visible');
      cy.get('[data-key="9"]').find(".jqx-tree-grid-checkbox").click()
      // Check to see the details
      cy.get('[data-key="5"]').find(".jqx-tree-grid-checkbox").click()
      // press "View selected data" to see the city
      cy.get('button[id="btn"]').click()
      // check we get 4 items
      cy.get('.jqx-listitem-element').should('have.length', 4)
      // check all are from Tacoma
      cy.get('#listBoxSelected').should('be.visible');
      cy.get('#listitem0listBoxSelected').should('be.visible').should("have.text","Steven is from London");
      cy.get('#listitem1listBoxSelected').should('be.visible').should("have.text","Michael is from London");
      cy.get('#listitem2listBoxSelected').should('be.visible').should("have.text","Robert is from London");
      cy.get('#listitem3listBoxSelected').should('be.visible').should("have.text","Anne is from London");
    })

})