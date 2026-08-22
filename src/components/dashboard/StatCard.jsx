import Card from "../Card";

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  iconClassName =
    "bg-gray-100 text-gray-600",
}) => {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-gray-400">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;