# frozen_string_literal: true

class Message
  include ActiveModel::Serializers::JSON

  attr_accessor :action,
                :from_class,
                :from_id,
                :to_class,
                :to_id,
                :data

  def initialize(attributes = {})
    @action = attributes[:action]
    @from_class = attributes[:from_class]
    @from_id = attributes[:from_id]
    @to_class = attributes[:to_class]
    @to_id = attributes[:to_id]
    @data = attributes[:data]
  end

  def attributes=(hash)
    hash.each do |key, value|
      send("#{key}=", value)
    end
  end

  def attributes
    instance_values
  end

  class << self
    def build(attributes = nil)
      attributes &&= format(attributes)
      new(attributes)
    end

    private

    def format(attributes)
      {
        action: attributes[:action],
        from_class: attributes[:from]&.class&.name,
        from_id: attributes[:from]&.id,
        to_class: attributes[:to]&.class&.name,
        to_id: attributes[:to]&.id,
        data: attributes[:data].to_json
      }
    end
  end

  # def from
  #   klass = from_class
  #   klass.find_by(id: from_id)
  # end
  # Same as #to method
  %i[from to].each do |name|
    define_method(name) do
      klass = instance_variable_get("@#{name}_class")&.constantize

      return nil unless klass

      klass.find_by(id: public_send("#{name}_id"))
    end
  end

  def broadcast
    channel.broadcast_to(to, self)
  end

  def channel
    return nil unless @to_class

    "#{@to_class}sChannel".constantize
  end

  def deliver
    MessageJob.perform_later(to_json)
  end
end
