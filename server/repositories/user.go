package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindAllUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	Register(user models.User) (models.User, error)
	Login(email string) (models.User, error)
	// UpdateUser(user models.User) (models.User, error)
	// DeleteUser(user models.User, ID int) (models.User, error)
}
type repository struct {
	db *gorm.DB
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindAllUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error
	return user, err
}

func (r *repository) Register(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) Login(email string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}
