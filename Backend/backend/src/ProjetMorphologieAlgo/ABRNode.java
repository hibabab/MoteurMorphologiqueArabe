package ProjetMorphologieAlgo;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public class ABRNode {
	 private String racine;
    private LinkedHashMap<String, Integer> derives;
    ABRNode left, right;

    public ABRNode(String racine) {
        this.setRacine(racine);
        this.left = null;
        this.right = null;
        this.setDerives(new LinkedHashMap<>());
    }
    public void ajouterOuIncrementer(String mot) {
        if (mot == null || mot.isEmpty()) return;

        if (getDerives().containsKey(mot)) {
            getDerives().put(mot, getDerives().get(mot) + 1);
            System.out.println("   🔄 Fréquence de '" + mot + "' mise à jour: "
                    + getDerives().get(mot));
        } else {
            getDerives().put(mot, 1);
            System.out.println("   ✅ Nouveau dérivé validé ajouté: '" + mot + "'");
        }
    }
    public Map<String, Integer> getTousDerivesAvecFrequences() {
        return Collections.unmodifiableMap(getDerives());
    }
	public String getRacine() {
		return racine;
	}
	public void setRacine(String racine) {
		this.racine = racine;
	}
	public LinkedHashMap<String, Integer> getDerives() {
		return derives;
	}
	public void setDerives(LinkedHashMap<String, Integer> derives) {
		this.derives = derives;
	}
}
