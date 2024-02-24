from matplotlib import pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Load the dataset
df = pd.read_csv('sri_lanka_river_basin_weather_water_levels.csv')



def plot_actual_vs_predicted(model, X_test, y_test):
    y_pred = model.predict(X_test)
    plt.figure(figsize=(10, 6))
    plt.scatter(y_test, y_pred, color='blue')
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], '--k', lw=2)
    plt.xlabel('Actual Water Level (m)')
    plt.ylabel('Predicted Water Level (m)')
    plt.title('Actual vs. Predicted Water Levels')
    plt.grid(True)
    plt.show()

# Prepare the data
# Saving the original river basin names for later mapping
river_basin_names = df['River Basin'].unique()
# Convert categorical data to numerical data
df['River Basin'] = df['River Basin'].astype('category').cat.codes

# Creating a mapping from codes back to river basin names
inverse_river_basin_mapping = {code: name for code, name in enumerate(river_basin_names)}

X = df[['River Basin', 'Temperature (°C)', 'Humidity (%)', 'Wind Speed (m/s)']]
y = df['Water Level (m)']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Save the model
model_file_path = 'water_level_predictor_rf_model.joblib'
joblib.dump(model, model_file_path)

# Test the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)

plot_actual_vs_predicted(model, X_test, y_test)
# Function to predict and format output
def predict_and_format(model, input_data):
    prediction = model.predict(input_data)[0]
    river_basin_code = input_data['River Basin'].iloc[0]
    river_basin_name = inverse_river_basin_mapping[river_basin_code]
    return {river_basin_name: prediction}

# Example usage
input_data_example = X_test.iloc[[0]]  # Simulating an input
formatted_prediction = predict_and_format(model, input_data_example)
print(formatted_prediction)

model_file_path
