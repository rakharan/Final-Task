package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	GetUserAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetUserAuth(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error
	return user, err
}
