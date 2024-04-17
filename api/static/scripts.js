let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-container'); // Update the content container ID

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-open');
    content.classList.add('content-shrink'); // Add class to shrink content
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-open');
    content.classList.remove('content-shrink'); // Remove class to expand content
    sidebarOpen = false;
  }
}

function toggleSidebar() {
  if (sidebarOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// ---------- CHARTS ----------

// BAR CHART
const barChartOptions = {
  series: [
    {
      data: [10, 8, 6, 4, 2],
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#246dec', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'],
  },
  yaxis: {
    title: {
      text: 'Count',
    },
  },
};

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: 'PRICE',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'LITRES CONSUMED',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: 'Price',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Consumption(in litres)',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();

// WEEKLY CHART
const weeklyChartOptions = {
  series: [
    {
      name: 'PRICE',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'LITRES CONSUMED',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: 'Price',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Consumption(in litres)',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

// WEEKLY CHART
const weeklyChart = new ApexCharts(
  document.querySelector('#weekly-chart'),
  areaChartOptions
);
weeklyChart.render();

// MONTHLY CHART
const monthlyChartOptions = {
  series: [
    {
      name: 'PRICE',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'LITRES CONSUMED',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: 'Price',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Consumption(in litres)',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

// WEEKLY CHART
const monthlyChart = new ApexCharts(
  document.querySelector('#monthly-chart'),
  areaChartOptions
);
monthlyChart.render();

function openPerksPage() {
  window.location.href = "perks.html"; // Change 'perks.html' to the desired URL
}