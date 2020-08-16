import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '0123456789',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('0123456789');

  })


  it('should not be able to create a new appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appoitmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appoitmentDate,
      provider_id: '0123456789',
    })

    expect(createAppointment.execute({
      date: appoitmentDate,
      provider_id: '0123456789',
    })).rejects.toBeInstanceOf(AppError);
  })

});
