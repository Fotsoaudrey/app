from fastapi import FastAPI

from schemas.tache import Tache

app = FastAPI()

@app.get("/taches")

def hello():
    return{"message":"hello word"}

@app.get("/taches/{tache_id}")
def getTache(tache_id: int):
    return{"message" : f"La tache a pour valeur {tache_id}"}

@app.post("/taches/")
def createTache(t: Tache):
    return{"message" : "tache recu", "tache": t}

@app.put("/taches/{tache_id}")
def udapteTaches(tache_id : int, t: Tache):
    return{"message": f"je vais modifier la tache {tache_id}", "nouvelle valeur" : t}

@app.delete("/taches/{tache_id}")
def deleteTaches(tache_id: int):
    return{"message": f"la tache supprimer est {tache_id}"}