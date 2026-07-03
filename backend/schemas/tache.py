from pydantic import BaseModel, Field

from enum import Enum

class Etat (str,Enum):
    AFAIRE = "a faire"
    ENCOUR = "en cour"
    TERMINEE = "terminee"


class Tache(BaseModel):
    titre: str = Field(min_lenght=2)
    description: str = Field(min_lenght=2)
    etat: Etat