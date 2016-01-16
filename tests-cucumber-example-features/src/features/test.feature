# language: fr

@toto
@titi
@tutu
Fonctionnalité: test

  Afin de tester Cucumber
  En tant que développeur
  Je souhaite écrire des scénarios de tests

  # Commentaire sur le premier test
  Scénario: Premier test
    Quand j'additionne 5 et 8
    Alors j'obtiens 13

  # Joli test avec un tableau
  # Et ça marche !
  @tata @titi
  Scénario: Test avec un tableau
    Alors j'obtiens le tableau suivant:
      | 1 | 2 | 3 |
      | 4 | 5 | 6 |

  # Commentaire sur le second test
  @tata
  Plan du scénario: Second test : additionner <A> et <B>
    Quand j'additionne <A> et <B>
    # Pourriture
    Alors j'obtiens <Résultat>

    Exemples:
      | A   | B   | Résultat |
      |   5 |   8 |       13 |
      | 104 |  -6 |       98 |
      | 1   |   2 |       10 |
