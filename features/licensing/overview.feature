@javascript
Feature: Overview page
  As a user
  I want to visit the licensing overview page
  So I can see summary data and navigate to other pages

  Scenario: visiting overview page
       When I go to /performance/licensing
       Then I should get back a status of 200

  Scenario: live service module
    When I go to /performance/licensing
    Then I should see the module "Real-time usage"
     And the module should contain the text "11 users online now"

  @svg
  Scenario: forms received module
    When I go to /performance/licensing
    Then I should see the module "Forms received"
     And the module should contain a graph
     And the module should contain 2 tabs

  Scenario: completion rate module
    When I go to /performance/licensing
    Then I should see the module "Completion rate"

  @svg
  Scenario: submission drop-offs module
    When I go to /performance/licensing
    Then I should see the module "Users at each stage"

  Scenario: top licences module
    When I go to /performance/licensing
    Then I should see the module "Top licences last week"
     And the module should contain a link to "/performance/licensing/licences"

  Scenario: top authorities module
    When I go to /performance/licensing
    Then I should see the module "Top authorities last week"
    And the module should contain a link to "/performance/licensing/authorities"
