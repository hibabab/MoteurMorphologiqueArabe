package ProjetMorphologieAlgo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

public class HashTable {

    // clé = nom du schème, valeur = liste de règles
    private HashMap<String, List<String>> table;

    public HashTable() {
        table = new HashMap<>();
        initialiserTable();
    }

    // Initialiser la table avec les schèmes arabes
 
        // Schème فاعل
    	private void initialiserTable() {
    	    // Schèmes existants
    	    List<String> reglesFaail = new ArrayList<>();
    	    reglesFaail.add("V[0]اV[1]V[2]"); // فاعل (faā'il) - actif
    	    table.put("فاعل", reglesFaail);
    	    
    	    List<String> reglesMafoul = new ArrayList<>();
    	    reglesMafoul.add("مV[0]V[1]وV[2]"); // مفعول (maf'ūl) - passif
    	    table.put("مفعول", reglesMafoul);
    	    
    	    List<String> reglesIftaal = new ArrayList<>();
    	    reglesIftaal.add("اV[0]تV[1]V[2]"); // افتعل (ifta'ala) - réflexif
    	    table.put("افتعل", reglesIftaal);
    	    
    	    // --- NOUVEAUX SCHÈMES ---
    	    
    	    // Schème مفعال (intensif)
    	    List<String> reglesMifaal = new ArrayList<>();
    	    reglesMifaal.add("مV[0]V[1]اV[2]"); // mif'āl
    	    table.put("مفعال", reglesMifaal);
    	    
    	    // Schème تفعيل (causatif)
    	    List<String> reglesTafiel = new ArrayList<>();
    	    reglesTafiel.add("تV[0]V[1]يV[2]"); // taf'īl
    	    table.put("تفعيل", reglesTafiel);
    	    
    	    // Schème استفعل (demande/réflexif)
    	    List<String> reglesIstafal = new ArrayList<>();
    	    reglesIstafal.add("اV[0]تV[1]V[2]"); // istaf'ala
    	    // Note: Même structure que افتعل mais avec sens différent
    	    // Pour différencier, on pourrait ajouter une variante
    	    reglesIstafal.add("استV[0]V[1]V[2]"); // istaf'ala
    	    table.put("استفعل", reglesIstafal);
    	    
    	    // Schème تفاعل (réciproque)
    	    List<String> reglesTafaal = new ArrayList<>();
    	    reglesTafaal.add("تV[0]اV[1]V[2]"); // tafā'ul
    	    table.put("تفاعل", reglesTafaal);
    	    
    	    // Schème انفعل (passif/réflexif)
    	    List<String> reglesInfal = new ArrayList<>();
    	    reglesInfal.add("اV[0]V[1]V[2]"); // infa'ala
    	    table.put("انفعل", reglesInfal);
    	    
    	    // Schème افتعال (intensif)
    	    List<String> reglesIftial = new ArrayList<>();
    	    reglesIftial.add("اV[0]تV[1]اV[2]"); // ifti'āl
    	    table.put("افتعال", reglesIftial);
    	    
    	    // Schème مفعَل (lieu)
    	    List<String> reglesMafal = new ArrayList<>();
    	    reglesMafal.add("مV[0]V[1]V[2]"); // maf'al (lieu)
    	    table.put("مفعل", reglesMafal);
    	    
    	    // Schème مفعِلة (instrument)
    	    List<String> reglesMafila = new ArrayList<>();
    	    reglesMafila.add("مV[0]V[1]V[2]ة"); // mif'ila (instrument)
    	    table.put("مفعلة", reglesMafila);
    	    
    	    // Schème فعّال (profession/intensif)
    	    List<String> reglesFaal = new ArrayList<>();
    	    reglesFaal.add("V[0]V[1]اV[2]"); // fa''āl
    	    table.put("فعّال", reglesFaal);
    	    
    	    // Schème مَفْعَلَة (nom de lieu féminin)
    	    List<String> reglesMafala = new ArrayList<>();
    	    reglesMafala.add("مV[0]V[1]V[2]ة"); // maf'ala
    	    table.put("مفعلة", reglesMafala);
    	    
    	    // Schème فِعال (nom d'action)
    	    List<String> reglesFial = new ArrayList<>();
    	    reglesFial.add("V[0]اV[1]V[2]"); // fi'āl
    	    table.put("فعال", reglesFial);
    	    
    	    // Schème تَفْعِلة (nom d'action)
    	    List<String> reglesTafila = new ArrayList<>();
    	    reglesTafila.add("تV[0]V[1]V[2]ة"); // taf'īla
    	    table.put("تفعيلة", reglesTafila);
    	}

    // ajouter un schème et ses règles
    public void put(String key, List<String> rules) {
        table.put(key, rules);
    }

    // récupérer les règles d'un schème
    public List<String> getRules(String key) {
        return table.get(key);
    }

    // Transformer un verbe selon un schème donné
    public String transformer(String verbe, String scheme) {
     

        // Convertir le verbe en tableau de caractères
        char[] radicales = verbe.toCharArray();
        
        // Récupérer les règles du schème
        List<String> regles = table.get(scheme);
        
      

        // Appliquer la première règle (pour simplifier, on prend la première)
        String regle = regles.get(0);
        
        // Remplacer les placeholders par les radicales
        String resultat = regle
            .replace("V[0]", String.valueOf(radicales[0]))
            .replace("V[1]", String.valueOf(radicales[1]))
            .replace("V[2]", String.valueOf(radicales[2]));
        
        return resultat;
    }

    // Méthode utilitaire pour afficher tous les schèmes disponibles
    public void afficherSchemes() {
        System.out.println("Schèmes disponibles:");
        for (String scheme : table.keySet()) {
            System.out.println("- " + scheme + " : " + table.get(scheme));
        }
    }
    public Set<String> getSchemes() {
        return table.keySet();
    }
    }
