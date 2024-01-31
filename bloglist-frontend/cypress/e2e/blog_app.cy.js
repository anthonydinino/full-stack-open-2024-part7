/// <reference types="Cypress" />
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
    cy.createUser({
      username: "adinino",
      name: "Anthony Dinino",
      password: "password",
    });
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("form").should("have.descendants", "input");
    cy.contains("username").should("be.visible");
    cy.contains("password").should("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("adinino");
      cy.get("#password").type("password");
      cy.contains("login").get("button[type='submit']").click();
      cy.contains("adinino logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("adinino");
      cy.get("#password").type("wrongpassword");
      cy.contains("login").get("button[type='submit']").click();
      cy.get(".notification").should("contain", "wrong username or password");
      cy.get(".notification").should("have.css", "border-style", "solid");
      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "adinino logged in");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "adinino", password: "password" });
    });
    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("form").within(() => {
        cy.get("#blog-title").type("Cypress Testing!");
        cy.get("#blog-author").type("Anthony U. Dinino");
        cy.get("#blog-url").type("https://testblog.com.au/blogs/1");
        cy.get("button").click();
      });
      cy.get(".notification")
        .should(
          "contain",
          "a new blog Cypress Testing! by Anthony U. Dinino added"
        )
        .and("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".blog").should("contain", "Cypress Testing! Anthony U. Dinino");
    });
  });

  describe("Blog is created", function () {
    beforeEach(function () {
      cy.login({ username: "adinino", password: "password" });
      cy.createBlog({
        title: "Cypress Testing!",
        author: "Anthony U. Dinino",
        url: "https://testblog.com.au/blogs/1",
      });
    });
    it("user can like a blog", function () {
      cy.get(".blog").within(() => {
        cy.contains("view").click();
        cy.get("button").contains("like").click();
        cy.contains("likes").should("contain.text", "likes 1");
      });
    });
    it("user can delete their own blog", function () {
      cy.get(".blog").within(() => {
        cy.contains("view").click();
        cy.contains("remove").click();
      });
      cy.get("html").contains(".blog").should("not.exist");
    });
    it("only creator can see the delete button", () => {
      cy.createUser({ username: "test", password: "password" });
      cy.login({ username: "test", password: "password" });
      cy.get(".blog").within(() => {
        cy.contains("view").click();
        cy.get("button").contains("remove").should("not.exist");
      });
    });
    it("blogs are ordered according to likes descending", () => {
      cy.createBlog({
        title: "An Amazing Blog",
        author: "Anthony U. Dinino",
        url: "https://testblog.com.au/blogs/2",
      });
      cy.get(".blog").eq(0).should("contain.text", "Cypress Testing!");
      cy.get(".blog").eq(0).contains("view").click();
      cy.get(".blog")
        .eq(1)
        .within(() => {
          cy.contains("view").click();
          cy.get("button").contains("like").click();
        });
      cy.get(".blog").eq(0).should("contain.text", "An Amazing Blog");
    });
  });
});
