package handlers

import (
	"fmt"
	dto "landtick/dto/result"
	ticketdto "landtick/dto/ticket"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"
	"time"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTicket struct {
	TicketRepository  repositories.TicketRepository
	StationRepository repositories.StationRepository
}

func HandlerTicket(TicketRepository repositories.TicketRepository, StationRepository repositories.StationRepository) *handlerTicket {
	return &handlerTicket{
		TicketRepository:  TicketRepository,
		StationRepository: StationRepository,
	}
}

func (h *handlerTicket) FindAllTickets(c echo.Context) error {
	tickets, err := h.TicketRepository.FindAllTickets()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: tickets})
}

func (h *handlerTicket) CreateTicket(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	startStationId, _ := strconv.Atoi(c.FormValue("start_station_id"))
	destinationStationId, _ := strconv.Atoi(c.FormValue("destination_station_id"))
	startDate, _ := time.Parse("2006-01-02", c.FormValue("start_date")) // parse the full date-time string
	formattedStartDate, _ := time.Parse("2006-01-02", startDate.Format("2006-01-02"))

	startTime := c.FormValue("start_time")
	arrivalTime := c.FormValue("arrival_time")
	price, _ := strconv.Atoi(c.FormValue("price"))
	stock, _ := strconv.Atoi(c.FormValue("qty"))

	startStation, _ := h.StationRepository.GetStationById(startStationId)
	endStation, _ := h.StationRepository.GetStationById(destinationStationId)

	request := models.Ticket{
		TrainName:      c.FormValue("train_name"),
		TrainType:      c.FormValue("train_type"),
		StartStationID: startStationId,
		EndStationID:   destinationStationId,
		StartDate:      formattedStartDate,
		StartTime:      startTime,
		ArrivalTime:    arrivalTime,
		Price:          price,
		Stock:          stock,
		UserID:         int(userId),
	}
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	ticket := models.Ticket{
		TrainName:      request.TrainName,
		TrainType:      request.TrainType,
		StartStationID: request.StartStationID,
		StartStation:   startStation,
		EndStation:     endStation,
		EndStationID:   request.EndStationID,
		StartDate:      request.StartDate,
		StartTime:      request.StartTime,
		ArrivalTime:    request.ArrivalTime,
		Price:          request.Price,
		Stock:          request.Stock,
		UserID:         request.UserID,
	}

	ticket, err = h.TicketRepository.CreateTicket(ticket)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	ticketResponse := models.Ticket{
		ID:             ticket.ID,
		TrainName:      ticket.TrainName,
		TrainType:      ticket.TrainType,
		StartStation:   ticket.StartStation,
		EndStation:     ticket.EndStation,
		StartStationID: ticket.StartStationID,
		EndStationID:   ticket.EndStationID,
		StartDate:      ticket.StartDate,
		StartTime:      ticket.StartTime,
		ArrivalTime:    ticket.ArrivalTime,
		Price:          ticket.Price,
		Stock:          ticket.Stock,
		UserID:         ticket.UserID,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: ticketResponse})
}

func (h *handlerTicket) GetTicket(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	ticket, err := h.TicketRepository.GetTicket(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusOK, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: ticket})
}

func (h *handlerTicket) CreateTransactionQty(c echo.Context) error {
	fmt.Println("test")

	request := new(ticketdto.TransTicket)

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))
	ticket, err := h.TicketRepository.GetTicket(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	Total := ticket.Price * request.Stock
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))
	transID := int(time.Now().Unix())

	requestTransactionTicket := models.Transaction{
		ID:       transID,
		TicketID: ticket.ID,
		UserID:   userId,
		Total:    Total,
		Stock:    request.Stock,
		Status:   "pending",
	}

	MyTicketQty, err := h.TicketRepository.CreateTransactionQty(requestTransactionTicket)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: MyTicketQty})
}

func (h *handlerTicket) DeleteTicket(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	ticket, err := h.TicketRepository.GetTicket(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusOK, Message: err.Error()})
	}

	data, err := h.TicketRepository.DeleteTicket(ticket)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Delete Success", Data: data})
}
