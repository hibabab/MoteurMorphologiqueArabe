package ProjetMorphologieAlgo;

import java.io.*;
import java.util.LinkedHashMap;

public class ABRTree {
    ABRNode root;
	
    // Constructeur
    public ABRTree() {
        this.root = null;
    }
    
    // Constructeur avec fichier
    public ABRTree(String fichierVerbes) throws IOException {
        this.root = null;
        chargerVerbesDepuisFichier(fichierVerbes);
    }
    
    // 1. Charger les verbes depuis un fichier texte
    public void chargerVerbesDepuisFichier(String nomFichier) throws IOException {
        BufferedReader lecteur = new BufferedReader(new FileReader(nomFichier));
        String ligne;
        int count = 0;
        
        System.out.println("Chargement du fichier: " + nomFichier);
        
        while ((ligne = lecteur.readLine()) != null) {
            ligne = ligne.trim();
            if (ligne.length() >= 3) { // verbe de 3 lettres minimum
                insert(ligne);
                count++;
            }
        }
        lecteur.close();
        System.out.println(count + " verbes chargés dans l'arbre.");
    }

    // 2. Insérer une racine
    public ABRNode insert(String r) {
       return root = insertRec(root, r);
    }

    private ABRNode insertRec(ABRNode node, String r) {
        if (node == null) return new ABRNode(r);

        if (r.compareTo(node.getRacine()) < 0)
            node.left = insertRec(node.left, r);
        else
            node.right = insertRec(node.right, r);

        return node;
    }

    // 3. Rechercher une racine
    public ABRNode search(String lettres) {
        ABRNode curr = root;
        while (curr != null) {
            int c = lettres.compareTo(curr.getRacine());
            if (c == 0) return curr;
            curr = c < 0 ? curr.left : curr.right;
        }
        return null;
    }
    
    // 4. Vérifier si une racine existe
    public boolean exists(String lettres) {
        ABRNode curr = root;
        while (curr != null) {
            int c = lettres.compareTo(curr.getRacine());
            if (c == 0) return true;
            curr = c < 0 ? curr.left : curr.right;
        }
        return false;
    }
    
    // 5. Afficher toutes les racines
    public void afficherToutesRacines() {
        if (root == null) {
            System.out.println("L'arbre est vide.");
            return;
        }
        
        System.out.println("=== Liste de toutes les racines ===");
        afficherInfixe(root);
        System.out.println("====================================");
    }
    
    // 6. Parcours infixe pour afficher dans l'ordre alphabétique
    private void afficherInfixe(ABRNode node) {
        if (node != null) {
            afficherInfixe(node.left);
            System.out.println("- " + node.getRacine());
            afficherInfixe(node.right);
        }
    }
    
   public void ajouterDeriveARacine(String verbe,String motGenere) {
	   
	   ABRNode r=search(verbe);
	   if(r==null) {
		   ABRNode nouveeau1=  insert(verbe);
		   nouveeau1.ajouterOuIncrementer(motGenere);
		
		   
		   
	   }
	   
	   r.ajouterOuIncrementer(motGenere);
	   
    	
    }
    
   
    
    
   
   /**
    * Méthode simple pour afficher toutes les racines avec leurs HashMaps de dérivés
    */
   public static void afficherRacinesAvecDerivesRecursif(ABRTree arbre) {
	    if (arbre == null || arbre.root == null) {
	        System.out.println("L'arbre est vide.");
	        return;
	    }
	    
	    // Appel de la fonction récursive interne avec la racine de l'arbre
	    afficherRacinesAvecDerivesRecursifInterne(arbre.root);
	}
// À AJOUTER dans la classe ABRTree
public ABRNode getRoot() {
    return root;
}

	private static void afficherRacinesAvecDerivesRecursifInterne(ABRNode node) {
	    if (node == null) {
	        return;
	    }
	    
	    // Parcours infixe (gauche, racine, droite)
	    afficherRacinesAvecDerivesRecursifInterne(node.left);
	    
	    // AFFICHAGE SIMPLE DE LA RACINE ET SON HASHMAP
	    System.out.println("\n--- Racine: " + node.getRacine() + " ---");
	    
	    LinkedHashMap<String, Integer> derives = node.getDerives();
	    
	    if (derives.isEmpty()) {
	        System.out.println("  HashMap: {}");
	    } else {
	        System.out.println("  HashMap: " + derives);
	    }
	    
	    afficherRacinesAvecDerivesRecursifInterne(node.right);
	}
  
}