from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import confusion_matrix, mean_squared_error, accuracy_score
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

# Load dataset
df = pd.read_csv('sri_lanka_river_basin_weather_water_levels.csv')
water_level_model = joblib.load('water_level_predictor_rf_model.joblib')
# Prepare the data for flood risk prediction

# show the first 5 rows of the dataset  
#print(df.head())
# get River Basin unique values
print(df['River Basin'].unique())

# get  three columns of the dataset  1 - river basin 2. water level 3. Status
df = df[['River Basin', 'Water Level (m)', 'Status']]

# River basin  is a categorical data, so we need to convert it to numerical data
df['River Basin'] = df['River Basin'].astype('category').cat.codes

print(df['River Basin'].unique())

# use RandomForestRegressor to predict the Status
# Split the data
X = df[['River Basin', 'Water Level (m)']]
y = df['Status']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the model
model_file_path = 'flood_risk_prediction_model.joblib'
joblib.dump(model, model_file_path)



# test the model
print(X_test['River Basin'])
y_pred = model.predict(X_test)

# make  prediction  using plot data  Heat map or scatter plot

import matplotlib.pyplot as plt
import seaborn as sns

# plot the data for categorical data using proper plot i think not suitable for scatter plot 
# sns.scatterplot(x='River Basin', y='Water Level (m)', data=df, hue='Status')

# plt.show()

# plot the data for categorical data using proper plot i think not suitable for scatter plot

# Create confusion matrix
conf_matrix = confusion_matrix(y_test, y_pred)

# Plot confusion matrix as a heatmap
plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', cbar=False)
plt.xlabel('Predicted labels')
plt.ylabel('True labels')
plt.title('Confusion Matrix')
plt.show()

#  need cat
accuracy = accuracy_score(y_test, y_pred)
print(accuracy)

# show each test data and its prediction
# for i in range(len(y_pred)):
#     print(X_test.iloc[i], y_pred[i])










