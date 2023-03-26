package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type StationRepository interface {
	CreateStation(station models.Station) (models.Station, error)
	FindAllStations() ([]models.Station, error)
	GetStationById(ID int) (models.Station, error)
	UpdateStation(station models.Station) (models.Station, error)
	DeleteStation(station models.Station) (models.Station, error)
}

func RepositoryStation(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindAllStations() ([]models.Station, error) {
	var stations []models.Station
	err := r.db.Find(&stations).Error

	return stations, err
}

func (r *repository) GetStationById(ID int) (models.Station, error) {
	var stationId models.Station
	err := r.db.First(&stationId, ID).Error

	return stationId, err
}

func (r *repository) CreateStation(station models.Station) (models.Station, error) {
	err := r.db.Create(&station).Error
	return station, err
}
func (r *repository) UpdateStation(station models.Station) (models.Station, error) {
	err := r.db.Model(&models.Station{}).Where("id = ?", station.ID).Updates(models.Station{Name: station.Name, City: station.City}).Error
	return station, err
}
func (r *repository) DeleteStation(station models.Station) (models.Station, error) {
	var stations models.Station
	err := r.db.Delete(&station).Error // Using Delete method

	return stations, err
}
