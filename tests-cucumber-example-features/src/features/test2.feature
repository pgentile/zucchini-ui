# language: fr

@toto
Fonctionnalité: test2
  Je souhaite écrire des scénarios de tests

  Contexte: Toto
    # Init de contexte
    Soit un contexte initialisé

  # Exemple de test qui ne marche pas
  Scénario: Test gauffré
    Quand j'additionne -1 et -1
    # Mauvais résultat
    Alors j'obtiens 500
    Et j'obtiens 600

  Scénario: Test à la con
    Quand j'additionne -1 et 12
    Alors j'obtiens 11

  @wip
  Scénario: En préparation
    Quand j'additionne -1 et 12
    Alors j'obtiens 11

  Scénario: Non implémenté
    Soit une tâche non implémentée

  Scénario: En attente
    Soit une tâche en attente

  @ignored
  Scénario: Test ignoré
    Quand j'additionne 1 et 2
    Alors j'obtiens 3
