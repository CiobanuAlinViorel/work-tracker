# Specificatii work tracker

- inregistrare timp de lucru pe utilizator
- login si register utilizator
- dashboard rezultate timing de lucru
- export excel cu datele ce privesc timpul de lucru
- identificare in timp real a activitatii (folosind geolocatie)

# Use cases

- implementare autentificare si inregistrare utilizatori
- pe web: 2 sectiuni: dashboard activitate (contine informatii despre timpul de lucru) si 
configurari globale plus multe altele (configurari locatie, inregistrare timp de lucru)
- pe mobile : similar ca la web dar cu 2 lucruri importante de atasat: identificator locatie
si transmitere notificare in momentul intrarii si iesirii din locul propus

## Entitati

User
- id
- email
- username
- hashedPassword
- createdAt
- updatedAt

Location
- id
- userId
- name
- latitude
- longitude
- radius
- createdAt
- updatedAt


WorkSession
- id
- userId
- locationId
- startTime
- endTime
- totalMinutes
- source
- createdAt
- updatedAt

enum Source 
manual
geofence
auto


GeofenceEvent
- id
- userId
- locationId
- type
- latitude
- longitude
- timestamp

enum Type 
ENTER
EXIT

DailySummary
- id
- userId
- date
- workedMinutes
- idealMinutes

MonthlyReport
- id
- userId
- month
- year
- totalMinutes
- filePath
- createdAt